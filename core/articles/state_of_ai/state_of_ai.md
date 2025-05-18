---
uid: 4
title: 'State of AI and cybersecurity and what is next'
description: ''
tags: ['LLM', 'AI agents', 'cybersecurity']
date: '2025-05-17T03:48:00+01:00'
path_image: 'https://core.gr1m0ire.xyz/state_of_ai/ressources/'
image_cont: 'https://core.gr1m0ire.xyz/state_of_ai/state_of_ai.png'
read_time: '15 min'
---

# The state of AI and cybersecurity today and what could be next

## About me

I'm an AI security engineer at a company developing AI Agents. With 3 years of specialized experience in AI security and 5 years in the broader cybersecurity field, I've built secure and confidential AI inference and training infrastructures, developed AI BOM software, and implemented various security solutions.

In this post, I'll share a practical overview of the protective measures needed for different components when building robust AI systems.

## Understanding the problem

> The focus of this first article will be on LLMs but I will broaden to the usage of models in AI Agents more generally in the next ones.

### AI and ML models security 

Since the emergence of Large Language Models, we've seen particular risks with machine learning models as they've become more accessible through interfaces and APIs. That led to discovering new ways to exploit the intended functioning of those models, hence new problems such as prompt injection. 

While research on LLM security is relatively new, research on ML model security more broadly is not. While LLMs are a subset of Machine Learning, they are not subject to the same attacks. For example Membership Inference Attacks are [not really applicable in LLMs](https://arxiv.org/pdf/2402.07841) because the training dataset are MASSIVE and the number of training Epochs for pre-trained models. 

> "Membership inference attacks (MIAs) aim to predict whether a particular record belongs to the training dataset of a given model." from the paper above.
> A training Epoch is defined as the number of iterations of all the training data. 

However, other types of attacks inherited from the old good days of Machine Learning still works, for instance, the one and only, data and model poisoning. 


### Defining a security threat model

In the end, it all goes back to defining a threat model for your AI system. What do you want to protect - Is it the model ? The data ? The infrastructure - *When using a RAG with proprietary data for example*?  

Each company or entity could have its own requirements depending on what service they offer. For example, if a company serves a chat model that accesses internal company data, it might more important than the model itself.


## Current solutions and workarounds 


### Securing LLMs through vulnerability scanner

Many interesting tools have been developed over the last few years to protect against, prompt injection, jailbreaking, data leakage, hallucinations and so on.

One of the most interesting vulnerability scanners is [Garak](https://docs.garak.ai/garak). 

Because testing ourselves is always better, let's take an example of a model and see. 

We are going to test a Qwen model for coding [Qwen2.5-Coder-1.5B-Instruct](https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B-Instruct). 

> I took a coder as an example to see if running generated code from a random model is a good idea.

The results are really interesting : 
![garak findings](https://core.gr1m0ire.xyz/state_of_ai/garak_1.png)

### AI supply chain 

When I talked about AI poisoning and 





## References 
- *Do Membership Inference Attacks Work on Large Language Models?* : [https://arxiv.org/pdf/2402.07841](https://arxiv.org/pdf/2402.07841)


