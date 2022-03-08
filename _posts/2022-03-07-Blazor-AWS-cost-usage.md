---
published: false
title: Blazor on AWS Elastic Beanstalk: Cost usage
date: 2022-03-07T08:00:00.000Z
author: fabiocozzolino
layout: post
permalink: /blazor-aws-elastic-beanstalk-cost-usage/
tags:
  - Blazor
  - WebAssembly
  - AWS
  - Elastic Beanstalk
---
In the [latest post](/deploy-net-6-blazor-webassembly-aws-elastic-beanstalk/) we explore a possibile way to deploy a Blazor WebAssembly. Now, I would like to check how much will cost the solution and look at the AWS services.

The solution, requires usage of different services:
- CodeBuild
- Elastic Beanstalk
  - Elastic Load Balancer
  - EC2 Instance
  - EC2 Others (Volume Usage, in my case)

As said in my [previous post](/deploy-net-6-blazor-webassembly-aws-elastic-beanstalk/), AWS Elastic Beanstalk give you the ability to have an application running without the necessity to think about the service needed, like the Load Balancer. This is why you read Elastic Load Balancer in the cost list.
By using AWS Cost Explorer and AWS Cost Management, we can create reports and analyze the costs of our AWS solution.

# CodeBuild costs
The CodeBuild cost for a Linux build machine is calculated in 0,01 euro cents per minute of execution. So if your run 3 release pipeline in a day, and each pipeline requires 4 minutes to complete, you'll have a cost of 0,12 cents per day. An average of 2,14 in a month (considering 20 working days). Not bad.

# Elastic Beanstalk
My Elastic Beanstalk solution, very simple, is composed by one instance of Elastic Cloud Computing, with auto-scaling enabled, and one Elastic Load Balancing. To calculate the costs, we must keep in mind two main values: execution time and volume usage. Respectively we will have an EC2 running cost and a EBS (Elastic Block Store) consumption costs.

So, each Elastic Beanstalk instance will costs:
- EC2: €0,061 per _On Demand Windows t3.medium Instance Hour_ - €1,46/day
- EBS: €0,10 per _GB-month of General Purpose SSD (gp2) provisioned storage - EU (Ireland)_ - 2.629 GB-Mo

Each Elastic Load Balancing
- $0.008 per _used Application load balancer capacity unit-hour (or partial hour)_ - 0.026 LCU-Hrs
- $0.0252 per _Application LoadBalancer-hour (or partial hour)_ - 59.000 Hrs



<p align="center">
  <img src="/assets/img/blazoraws_result_1.png" alt="Blazor app running on AWS">
</p>

As always, any feedback is welcome!
