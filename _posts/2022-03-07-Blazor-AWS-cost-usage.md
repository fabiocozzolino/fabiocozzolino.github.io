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
In the [latest post](/blazor-aws-elastic-beanstalk-cost-usage/) we explore a possibile way to deploy a Blazor WebAssembly. Now, I would like to check how much will cost the solution.

The solution, requires usage of different services:
- CodeBuild
- Elastic Beanstalk
  - EC2 Instance
  - Elastic Load Balancer
  - EC2 Others, composed by Volume Usage

With AWS Cost Management we can explore the costs and analyze it.

# CodeBuild costs
The CodeBuild cost for a Linux build machine is calculated in 0,01 euro cents per minute of execution. So if your run 3 release pipeline in a day, and each pipeline requires 4 minutes to complete, you'll have a cost of 0,12 cents per day. An average of 2,14 in a month (considering 20 working days).

# Elastic Beanstalk
Each Elastic Beanstalk environment is based on EC2 instances and Elastic Load Balancing. The consumption is based on execution time and volume usage.
Each Elastic Beanstalk instance costs:
- Cloud Compute Running: $0.064 per On Demand Windows t3.medium Instance Hour - 58.855 Hrs [$3.77]
- EBS: $0.11 per GB-month of General Purpose SSD (gp2) provisioned storage - EU (Ireland) - 2.629 GB-Mo [0,29]

Each Elastic Load Balancing
- $0.008 per used Application load balancer capacity unit-hour (or partial hour) - 0.026 LCU-Hrs
- $0.0252 per Application LoadBalancer-hour (or partial hour) - 59.000 Hrs


<p align="center">
  <img src="/assets/img/blazoraws_result_1.png" alt="Blazor app running on AWS">
</p>

As always, any feedback is welcome!
