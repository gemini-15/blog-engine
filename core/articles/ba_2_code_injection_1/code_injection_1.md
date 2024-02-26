---
uid: 2
title: 'Deep dive into code injection (Part I)'
description: 'A first look into code injection techniques in binaries and analysis.'
tags: ['binary analysis series', 'binary analysis', 'code injection', 'elf']
date: '2023-11-19T13:48:15+01:00'
path_image: 'https://thecapableone.ayzminy.blog/static/ba_2_code_injection_1/resources/'
image_cont: 'https://thecapableone.ayzminy.blog/static/ba_2_code_injection_1/demoninjector.webp'
read_time: '9 min'
---

# Deep dive into code injection in binaries (Part I)

Do you remember the cracked Photoshop CS4 suite that was largely available everywhere ? We even had burned CDs of the suite that was sold when I was younger. While it might not have any (or maybe?) relation with how it was cracked, I highly suspect code injection to be the way to add malware to the whole software (I might lost trust in those cracked softwares over time due to potentially having some malware inside).

So, while I am exploring binary analysis as a whole, let's get into code injection in binaries and particularly adding a code section in a binary ✌️. 

---
##  A quick overview of an ELF binary 

>  If you already know about how this part works, skip it ! Time is precious, you can waste it for example reading [r/wallstreetbets on Reddit](https://www.reddit.com/r/wallstreetbets/), (***top quality entertainment***)


### The ELF format
The ELF format (either designed for 32-bit or 64 bit) is composed of the following components. 
> there is a lot of things on the ELF format, so i might voluntarily miss some things but there is a lot of books that explains things in depth. One of them you can find here :  [https://www.cs.cmu.edu/afs/cs/academic/class/15213-f00/docs/elf.pdf](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f00/docs/elf.pdf) and the definition of the elf header can be found at the following location : `/usr/include/elf.h`

![ELF format](https://thecapableone.ayzminy.blog/static/ba_2_code_injection_1/resources/elf_format.png)

- ***An executable header :*** Mostly identifies the binary as an ELF file, what kind and gives the location of the other contents. 
- ***a series of program headers*** : in short, a bunch of sections bundled together. Program headers provide an execution view essential for shared object files and executable files.
- ***a number of sections :*** represents the code and data in an ELF binary. A section doesn't have a specific structure, but every section is described by a section header. 
- ***Section headers :*** A section header describes the section by locating the section and the number of bytes that it contains. Defined as the structure `Elf64_Shdr` in the `elf.h` file, it contains the virtual address at execution, offset, size...

### Sections in a binary 
In a simple Hello World program, we can view the different sections as such :

```bash
$ readelf --sections --wide a.out 
Il y a 31 en-têtes de section, débutant à l adresse de décalage 0x3698 :

En-têtes de section :
  [Nr] Nom               Type            Adr              Décala.Taille ES Fan LN Inf Al
  [ 0]                   NULL            0000000000000000 000000 000000 00      0   0  0
  [ 1] .interp           PROGBITS        0000000000000318 000318 00001c 00   A  0   0  1
  [ 2] .note.gnu.property NOTE            0000000000000338 000338 000020 00   A  0   0  8
  [ 3] .note.gnu.build-id NOTE            0000000000000358 000358 000024 00   A  0   0  4
  [ 4] .note.ABI-tag     NOTE            000000000000037c 00037c 000020 00   A  0   0  4
  [ 5] .gnu.hash         GNU_HASH        00000000000003a0 0003a0 000024 00   A  6   0  8
  [ 6] .dynsym           DYNSYM          00000000000003c8 0003c8 0000a8 18   A  7   1  8
  [ 7] .dynstr           STRTAB          0000000000000470 000470 00008f 00   A  0   0  1
  [ 8] .gnu.version      VERSYM          0000000000000500 000500 00000e 02   A  6   0  2
  [ 9] .gnu.version_r    VERNEED         0000000000000510 000510 000030 00   A  7   1  8
  [10] .rela.dyn         RELA            0000000000000540 000540 0000c0 18   A  6   0  8
  [11] .rela.plt         RELA            0000000000000600 000600 000018 18  AI  6  24  8
  [12] .init             PROGBITS        0000000000001000 001000 000017 00  AX  0   0  4 
  [13] .plt              PROGBITS        0000000000001020 001020 000020 10  AX  0   0 16 
  [14] .plt.got          PROGBITS        0000000000001040 001040 000008 08  AX  0   0  8
  [15] .text             PROGBITS        0000000000001050 001050 000104 00  AX  0   0 16 
  [16] .fini             PROGBITS        0000000000001154 001154 000009 00  AX  0   0  4
  [17] .rodata           PROGBITS        0000000000002000 002000 000012 00   A  0   0  4
  [18] .eh_frame_hdr     PROGBITS        0000000000002014 002014 00002c 00   A  0   0  4
  [19] .eh_frame         PROGBITS        0000000000002040 002040 0000ac 00   A  0   0  8
  [20] .init_array       INIT_ARRAY      0000000000003dd0 002dd0 000008 08  WA  0   0  8
  [21] .fini_array       FINI_ARRAY      0000000000003dd8 002dd8 000008 08  WA  0   0  8
  [22] .dynamic          DYNAMIC         0000000000003de0 002de0 0001e0 10  WA  7   0  8
  [23] .got              PROGBITS        0000000000003fc0 002fc0 000028 08  WA  0   0  8
  [24] .got.plt          PROGBITS        0000000000003fe8 002fe8 000020 08  WA  0   0  8
  [25] .data             PROGBITS        0000000000004008 003008 000010 00  WA  0   0  8
  [26] .bss              NOBITS          0000000000004018 003018 000008 00  WA  0   0  1
  [27] .comment          PROGBITS        0000000000000000 003018 00001f 01  MS  0   0  1
  [28] .symtab           SYMTAB          0000000000000000 003038 000360 18     29  18  8
  [29] .strtab           STRTAB          0000000000000000 003398 0001e3 00      0   0  1
  [30] .shstrtab         STRTAB          0000000000000000 00357b 00011a 00      0   0  1
Clé des fanions :
  W (écriture), A (allocation), X (exécution), M (fusion), S (chaînes), I (info),
  L (ordre des liens), O (traitement supplémentaire par l'OS requis), G (groupe),
  T (TLS), C (compressé), x (inconnu), o (spécifique à l'OS), E (exclu),
  D (mbind), l (grand), p (processor specific)
```

To not go over too much detail (or else it will be very long), let's just do an overview of the sections that we got on the command above.

- ***the `.init` and `.fini` sections*** : mostly viewed as the constructor and destructor of the program, as one is the first one to start and the second when the program exits.
- ***the `.text` section*** : Where the main code of the program resides. (only executable)
- ***the `.data`, `.bss` and `.rodata` sections*** : Some of these sections (`.data` and `.bss`), as expressed by the `WA` directive, are writable sections which purposely serves variables and whatnot (writable things needed). The `.bss` section has the special purpose of only reserving space for uninitialized variables. The `.rodata` in the other hand is read-only data mostly used for constant variables. 

> Let's note the different types also (`PROGBITS`, `SYMTAB`, `NOBITS`,`NOTE`...). You can find more information here : [https://refspecs.linuxbase.org/elf/elf.pdf](https://refspecs.linuxbase.org/elf/elf.pdf).


### Segments and section headers 

We can use `readelf` again to view the segments on the binary : 
```bash
$ readelf --wide --segments no-pie-a.out 

Type de fichier ELF est EXEC (fichier exécutable)
Point d entrée 0x401040
Il y a 13 en-têtes de programme, débutant à l'adresse de décalage 64

En-têtes de programme :
  Type           Décalage Adr. vir.          Adr.phys.          T.Fich.  T.Mém.   Fan Alignement
  PHDR           0x000040 0x0000000000400040 0x0000000000400040 0x0002d8 0x0002d8 R   0x8
  INTERP         0x000318 0x0000000000400318 0x0000000000400318 0x00001c 0x00001c R   0x1
      [Réquisition de l interpréteur de programme: /lib64/ld-linux-x86-64.so.2]
  LOAD           0x000000 0x0000000000400000 0x0000000000400000 0x0004e8 0x0004e8 R   0x1000
  LOAD           0x001000 0x0000000000401000 0x0000000000401000 0x000145 0x000145 R E 0x1000
  LOAD           0x002000 0x0000000000402000 0x0000000000402000 0x0000e4 0x0000e4 R   0x1000
  LOAD           0x002df8 0x0000000000403df8 0x0000000000403df8 0x000220 0x000228 RW  0x1000
  DYNAMIC        0x002e08 0x0000000000403e08 0x0000000000403e08 0x0001d0 0x0001d0 RW  0x8
  NOTE           0x000338 0x0000000000400338 0x0000000000400338 0x000020 0x000020 R   0x8
  NOTE           0x000358 0x0000000000400358 0x0000000000400358 0x000044 0x000044 R   0x4
  GNU_PROPERTY   0x000338 0x0000000000400338 0x0000000000400338 0x000020 0x000020 R   0x8
  GNU_EH_FRAME   0x002014 0x0000000000402014 0x0000000000402014 0x00002c 0x00002c R   0x4
  GNU_STACK      0x000000 0x0000000000000000 0x0000000000000000 0x000000 0x000000 RW  0x10
  GNU_RELRO      0x002df8 0x0000000000403df8 0x0000000000403df8 0x000208 0x000208 R   0x1

 Correspondance section/segment :
  Sections de segment...
   00     
   01     .interp 
   02     .interp .note.gnu.property .note.gnu.build-id .note.ABI-tag .gnu.hash .dynsym .dynstr .gnu.version .gnu.version_r .rela.dyn .rela.plt 
   03     .init .plt .text .fini 
   04     .rodata .eh_frame_hdr .eh_frame 
   05     .init_array .fini_array .dynamic .got .got.plt .data .bss 
   06     .dynamic 
   07     .note.gnu.property 
   08     .note.gnu.build-id .note.ABI-tag 
   09     .note.gnu.property 
   10     .eh_frame_hdr 
   11     
   12     .init_array .fini_array .dynamic .got 
```
> Let's note that I've also removed the PIE protection on the binary. 

---  
## First example : Injecting a new section in a binary

To avoid shifting all the sections and most certainly break everything, the most simplest way that comes to mind is to add the section at the end of the binary. 

However, as we saw in the quick reminder above, for the section to be called, it must be part of a segment, and must have a Program header that will point to the desired section. This is pretty much necessary because the program must know virtual address to look for to start the section.

But we can't really add a new program header & section header either because we will have the same issue as previously where we will have to add the section. 

So the idea presented here is to overwrite an existing one. 

One that does not really breaks anything related to the program's execution is the `PT_NOTE` segment related to the `PT_NOTE` header. 
As explained in the ELF spec, `PT_NOTE` is an array element that specifies the location and size of auxiliary information : 
> Sometimes a vendor or system builder needs to mark an object file with special information that other programs will check for conformance, compatibility, etc

In other words, it doesn't serve any purpose for us and we can overwrite as if it was your brother's game save progress ! ✌️

![Save progress](https://thecapableone.ayzminy.blog/static/ba_2_code_injection_1/resources/save_file.png)

### What needs to be changed ? 

To make the different changes on the elf binary, you can find the tool I used in this repo : [https://github.com/gemini-15/binary-analysis-hardcore-learning.git](https://github.com/gemini-15/binary-analysis-hardcore-learning.git). 


#### How the binary is loaded and executed




First of all, let's see how it currently works. 

As we saw with the output of the sections in a binary above, we can resume the available sections in the `PT_NOTE` segment to the following:
```bash
.note.gnu.property 
.note.gnu.build-id 
.note.ABI-tag 
``` 

From this useless trio (just kidding, they have a purpose, but it just does not affect the execution of the binary, see more here : [https://github.com/hjl-tools/linux-abi/wiki/linux-abi-draft.pdf](https://github.com/hjl-tools/linux-abi/wiki/linux-abi-draft.pdf)), we are going to change the `.note.ABI-tag` to be our new malicious section. 

Let's suppose that the sketch below represents our binary. 
The `PT_NOTE` segment and the `.note.ABI-tag` are called as follows : 

![Sketch PT_NOTE](https://thecapableone.ayzminy.blog/static/ba_2_code_injection_1/resources/pt_note.png)

The entry point defines the access to the binary. For example, we can change the address to point to another address in the binary to start the execution somewhere else. 

The `PT_NOTE` program header defines the segment and its sections (the three enumerated above). 

And the section header defines the section and their properties. 


#### Injecting the section at the end of the binary

**We want to injected a new section at the end of the binary.** This part is the easiest, because we just have to search for the end of the binary file, and add an injected code in the end. Pretty much like this: 

![Binary with injected code](https://thecapableone.ayzminy.blog/static/ba_2_code_injection_1/resources/binary_injected.png)







---
## References 

- [1] ***Dennis Andriesse (2019)***. *Practical Binary Analysis*. No Starch press. [https://practicalbinaryanalysis.com/](https://practicalbinaryanalysis.com/)
- [2] *Linux ELF format specs.* [https://refspecs.linuxbase.org/elf/elf.pdf](https://refspecs.linuxbase.org/elf/elf.pdf)
- [3] *elf man page* [https://www.man7.org/linux/man-pages/man5/elf.5.html](https://www.man7.org/linux/man-pages/man5/elf.5.html)
- [4] *Linux extension to gABI*. [https://github.com/hjl-tools/linux-abi/wiki/Linux-Extensions-to-gABI](https://github.com/hjl-tools/linux-abi/wiki/Linux-Extensions-to-gABI)