한국어 언어모델(ET5) README

>>> 파일에 대한 기본 설명 
- "config.json": 언어모델의 구조 정보를 담고 있는 파일 
- "pytorch_model.bin": 언어모델 weight를 저장한 파일 
- "spiece.model": vocab 모델 파일 
- "tokenizer_config.json": 토크나이저 구성 정보 파일 


>>> 기초 성능 정보 
- KorQuAD-1.0: F1_94.26-EM_86.37 
- AI Hub 요약 뉴스-abstractive: ROUGE-1/2/L 50.05 / 22.98 / 47.37


>>> 활용 정보 (1) Prerequisite 
- Huggingface Transformers (v4.3.2) https://github.com/huggingface/transformers 
- SentencePiece (v0.1.95) 

>>> 활용 정보 (2) Sample codes 
- "finetune-t5-ynat-code.tar.gz" 

