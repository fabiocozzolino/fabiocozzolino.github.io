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
  - EC2 Elastic Load Balancer
  - EC Others, which is composed by a cost applyed by Volume Usage

With AWS Cost Management we can explore the costs and analyze it.


<p align="center">
  <img src="/assets/img/blazoraws_result_1.png" alt="Blazor app running on AWS">
</p>

As always, any feedback is welcome!
