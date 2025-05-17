---
uid: 3
title: 'Deep dive into code injection (Part II): GOT and PLT hijacking, does it still work these days?'
description: 'Dynamic function resolution hijack : GOT and PLT hijacking, does it still works?'
tags: ['binary analysis series', 'binary analysis', 'code injection', 'elf']
date: '2024-08-08T13:48:15+01:00'
path_image: 'https://core.gr1m0ire.xyz/ba_2_code_injection_2/resources/'
image_cont: 'https://core.gr1m0ire.xyz/ba_2_code_injection_2/demoninjector.webp'
read_time: '9 min'
---

# Deep dive into code injection in binaries (Part II): GOT and PLT hijacking, does it still work these days?

In an ELF binary there is two types of linking. Static and dynamic linking. When a binary uses a shared library, it is called dynamically linked, otherwise, if a binary is self-contained, is it statically linked. 

Why do we need shared libraries you might ask? 

---

## What is dynamic function resolution 
The ***Global Offset Table (GOT)*** is used by dynamically linked ELF binary to resolve functions that located in shared libraries. Such calls points to the ***Procedure Linkage Table*** (`.plt` section) of the binary. 

Hijacking the ***GOT*** has two interesting advantages : 
- Persistent binary modification
- Binary exploitation at runtime 






---
## References 

- [1] ***Dennis Andriesse (2019)***. *Practical Binary Analysis*. No Starch press. [https://practicalbinaryanalysis.com/](https://practicalbinaryanalysis.com/)
- [2] *Linux ELF format specs.* [https://refspecs.linuxbase.org/elf/elf.pdf](https://refspecs.linuxbase.org/elf/elf.pdf)
- [3] *elf man page* [https://www.man7.org/linux/man-pages/man5/elf.5.html](https://www.man7.org/linux/man-pages/man5/elf.5.html)
- [4] *Linux extension to gABI*. [https://github.com/hjl-tools/linux-abi/wiki/Linux-Extensions-to-gABI](https://github.com/hjl-tools/linux-abi/wiki/Linux-Extensions-to-gABI)