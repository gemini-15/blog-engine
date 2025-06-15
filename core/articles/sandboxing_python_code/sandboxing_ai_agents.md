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

# The importance of sandboxing in AI agents 

The importance of sandboxing in AI agents have been in my mind for some time now. And a recent RCE unauth flaw in LangFlow gave me the assurance that it is something that should be thought of.

So let's deep dive into it. 

## Why, what and how? 

Running arbitrary code is never a good idea. But sometimes we need to. In the case of Agentic AI, it became clear that running code will be necessary to build workflows with self-evaluation and feedback. 

But it's not just about dealing with running arbitrary code, it's also how to securely interact the filesystem, network, and other applications. 

The inpredictability of LLMs. 

The objective of this article is to show some ways to run Python code in a controlled environment. The running code might not be necessary to be ran server-side. Also we need to have control on the dependencies that we import beforehand.  

> 

## The ways to do it 
I will be presenting 2 ways to achieve the same purpose. Depending on the architecture that you have in mind or suits you better. 

- Using containers : In cybersecurity, and especially in malware analysis, we've had some prior knowledge of how to sandbox


## references
- *Unsafe at Any Speed: Abusing Python Exec for Unauth RCE in Langflow AI* - Naveen Sunkavally : [https://horizon3.ai/attack-research/disclosures/unsafe-at-any-speed-abusing-python-exec-for-unauth-rce-in-langflow-ai/](https://horizon3.ai/attack-research/disclosures/unsafe-at-any-speed-abusing-python-exec-for-unauth-rce-in-langflow-ai/)