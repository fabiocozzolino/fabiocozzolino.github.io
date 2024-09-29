---
published: false
title: Deploy a .NET Aspire application on AWS
date: 2024-09-30T08:00:00.000Z
author: fabiocozzolino
layout: post
permalink: /Deploy-NET-Aspire-AWS/
tags:
  - Serverless
  - AWS
  - Lambda
  - Aurora
  - CQRS
---
# Introduction

# What is .NET Aspire
.NET Aspire is not a new framework or a technology, it is a set of pillars that enable cloud-ready application development. It is delivered through a collection of NuGet packages that han




In the last [post](https://www.fabiocozzolino.eu/CQRS-with-NET-and-AWS/) we talked about CQRS and how it is possible to implement it in AWS by using .NET and taking advantage from using all the power of the Cloud Native approach.

The proposed solution comes with a big limitation: it is only possible to subscribe 2 different Lambda functions to one DynamoDB Stream. Obviously, this works fine if we don’t need to build more than two different read models, but if this is the case, how we can overcome the limit?

The idea here is to use another service to propagate the event to the different subscribers. We have a couple of different options:

- Simple Notification Service (SNS): a service designed to send asynchronous notifications;
- EventBridge: a service useful to send real-time notifications;

# One service to rule them all

In our simple use case, we need to asynchronously update all the consumers that want to be notified when something in the *Product* table changes. We doesn’t have complicated rules and the application doesn’t require to manage complex processing. This means that SNS fit perfectly for our needs. So, let’s see how to integrate in our application.

First of all, we need to update our schema to include the new model. At the moment, is not possible to subscribe SNS directly to DynamoDB Stream (which is possible with EventBridge), so we need to use something else to process the message from DynamoDB and send it to SNS. As already done, we can still use a Lambda function, which will be responsible to receive the notification from DynamoDB Stream and send to the SNS. On the other side, the notification will be distributed to different consumers by the SNS, and we can still use a set of Lambda functions to process the notification according to the read model needs. This set of Lambda functions will adapt the input message to the different read models.

Following, you can see the updated schema:

<p align="center">
  <img src="/assets/img/CQRS_AWS_SNS_1.png" alt="">
</p>

Just to provide you a more complete idea of the possibilities available with this approach, in the above architecture schema I’ve included also different types of Query Handlers and Storage. You can build an handler or a storage by using the most useful technology that fits better the specific domain. As an example, the schema show a Fargate solution in both Cart Query Service and Store Query Service, with two different storage: Aurora and RDS.

# Connect your Simple Notification Service

In the previous post we have seen how to connect a Lambda function to the DynamoDB Stream. By using the same approach, we can configure a SNS as destination of the Lambda function. So, we can go to our Lambda  and update it according to the following code (full code on previous post):

```csharp
Product product = new Product
{
    ProductId = Convert.ToInt32(newImage["ProductId"].N),
    Name = newImage["Name"].S,
    Price = Convert.ToDecimal(newImage["Price"].N)
};
string productJson = JsonSerializer.Serialize(product);

var publishRequest = new PublishRequest
{
    TopicArn = "arn:aws:sns:...:ProductUpdated",
    Message = productJson
};
await snsClient.PublishAsync(publishRequest);
```

But, first of all, we need to create the SNS topic and than configure the **AWS Lambda** that  needs to receive the published message:

<p align="center">
  <img src="/assets/img/CQRS_AWS_SNS_2.png" alt="">
</p>

Finally, we can rewrite the Lambda function to receive the message from SNS and than write into the target database:

```csharp
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
public class Function
{
    private readonly AmazonSNS _snsClient;

    public Function()
    {
        _snsClient = new AmazonSNS(); // Replace with your SNS client configuration if needed
    }

    public async Task FunctionHandler(SNSEvent snsEvent, ILambdaContext context)
    {
        foreach (var record in snsEvent.Records)
        {
            var snsRecord = record.Sns;
            
            Product product = JsonSerializer.Deserialize<Product>(snsRecord.Message);
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = "INSERT INTO Product (ProductId, Name, Price) VALUES (@ProductId, @Name, @Price)";
                    cmd.Parameters.AddWithValue("@ProductId", product.ProductId);
                    cmd.Parameters.AddWithValue("@Name", product.Name);
                    cmd.Parameters.AddWithValue("@Price", product.Price);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
```

# Conclusion

As show in this post, it is really easy to use that approach with the different set of services available in AWS. In the next post, we’ll see another way to reach out the same result.

Enjoy!
