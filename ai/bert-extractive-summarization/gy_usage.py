import torch
from models.model_builder import ExtSummarizer
from ext_sum import summarize

# Load model
model_type = 'mobilebert' #@param ['bertbase', 'distilbert', 'mobilebert']
checkpoint = torch.load(f'checkpoints/{model_type}_ext.pt', map_location='cpu')
model = ExtSummarizer(checkpoint=checkpoint, bert_type=model_type, device='cpu')

# Run summarization
input_fp = 'raw_data/WSJ_GY.txt'
result_fp = 'results/GY_N.txt'
summary = summarize(input_fp, result_fp, model, max_length=3)
print(summary)