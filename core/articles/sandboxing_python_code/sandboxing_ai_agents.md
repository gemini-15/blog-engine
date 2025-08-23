---
uid: 4
title: 'The importance of sandboxing in AI agents'
description: "A lesson to learn from LangFlow's RCE CVE-2025-3248"
tags: ['LLM', 'Agentic AI', 'cybersecurity']
date: '2025-06-15T03:48:00+01:00'
path_image: 'https://core.gr1m0ire.xyz/sandboxing_python_code/ressources/'
image_cont: 'https://core.gr1m0ire.xyz/sandboxing_python_code/sand.png'
read_time: '10 min'
---

# The importance of sandboxing and access control in AI agents 

Recently, a good number of AI agents are failing and in some cases getting exploited, due to a lack of sandboxing and access control. 
We can recall :
- g


## Why, what and how? 

Running arbitrary code is never a good idea. But sometimes we need to. In the case of Agentic AI, it became clear that running code will be necessary to build workflows with self-evaluation and feedback. 

But it's not just about dealing with running arbitrary code, it's also about how to secure interactions with the filesystem, network, and other applications. 

The unpredictability of LLMs makes it difficult to resolve the issue solely by using safety measures.  



## Current security measures implemented
Classifiers, guardrails and other detection systems have been developped to response to prompt injection. 

These protective measures have an advantage in resolving the issue for most cases. 
In my last article 



## references
- *Unsafe at Any Speed: Abusing Python Exec for Unauth RCE in Langflow AI* - Naveen Sunkavally : [https://horizon3.ai/attack-research/disclosures/unsafe-at-any-speed-abusing-python-exec-for-unauth-rce-in-langflow-ai/](https://horizon3.ai/attack-research/disclosures/unsafe-at-any-speed-abusing-python-exec-for-unauth-rce-in-langflow-ai/)