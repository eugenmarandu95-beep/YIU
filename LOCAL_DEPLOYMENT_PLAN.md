# NEXUS Local Deployment Plan

## Minimum viable local brain

- Local language model
- Local vector database
- TOLBIT document index
- Tool runner
- Audit log
- Terminal interface

## Hardware tiers

| Tier | Hardware | Practical model class |
|---|---|---|
| Entry | 8–16 GB RAM / CPU | 1B–4B quantized |
| Standard | 16 GB VRAM GPU | 7B–14B quantized |
| Strong | 24 GB VRAM GPU | 14B–30B quantized |
| Advanced | 48 GB+ VRAM | 30B–70B class |

## Deployment rule

Use local inference for private knowledge and routine tasks. Use cloud only with explicit consent and only for tasks that require it.
