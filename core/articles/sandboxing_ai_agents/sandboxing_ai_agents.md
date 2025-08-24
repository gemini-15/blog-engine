---
uid: 4
title: 'The importance of sandboxing in AI agents'
description: "Deep dive into how to secure AI agents."
tags: ['LLM', 'Agentic AI', 'cybersecurity']
date: '2025-06-15T03:48:00+01:00'
path_image: 'https://core.gr1m0ire.xyz/sandboxing_ai_agents/resources/'
image_cont: 'https://core.gr1m0ire.xyz/sandboxing_ai_agents/sand.png'
read_time: '10 min'
---

# The importance of sandboxing and access control in AI agents 

Recently, a good number of AI agents are failing and in some cases getting exploited, due to a lack of sandboxing and access control. 
We can recall :

- test

## Why, what and how?

before talking about sandboxing, it might be good to understand what we want to secure. 

In Agentic AI, we have multiple systems that can go together. 
If we do a small threat model, we can see that the most interesting attack vectors are coming from the tools. 
In the tools of an AI agent we can find, 
- MCP clients 
- Execution environment or code interpreters
- RAG access 
- Memory 

### Specific to LLMs

Running arbitrary code is never a good idea. But sometimes we need to. In the case of Agentic AI, it became clear that running code will be necessary to build workflows with self-evaluation and feedback. 

But it's not just about dealing with running arbitrary code, it's also about how to secure interactions with the filesystem, network, and other applications. 

The unpredictability of LLMs makes it difficult to resolve the issue solely by using safety measures.  

### MCP 



## Current security measures implemented

I've talked in my last article about the numerous attacks on LLMs including the ones related to prompt injection. 
Most of the work that is done to counter these attacks is focus on guardrails, classifiers and scanners. This should supposedly resolve most of the issues. 




## references
- *Unsafe at Any Speed: Abusing Python Exec for Unauth RCE in Langflow AI* - Naveen Sunkavally : [https://horizon3.ai/attack-research/disclosures/unsafe-at-any-speed-abusing-python-exec-for-unauth-rce-in-langflow-ai/](https://horizon3.ai/attack-research/disclosures/unsafe-at-any-speed-abusing-python-exec-for-unauth-rce-in-langflow-ai/)