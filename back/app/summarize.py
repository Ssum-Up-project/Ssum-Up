from transformers import pipeline


def summarize(subtitles):

    # 임시 예외처리(데모용) - AI님과 협의함. 모델 바꿀수있기 때문임.
    subt_length = len(subtitles)
    print('자막길이', subt_length)
    if subt_length >= 4350:
        sub_titles = subtitles[:4350-1]
    else:
        sub_titles = subtitles

    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summarized_subtitles = summarizer(
        sub_titles, max_length=300, min_length=30, do_sample=False
    )

    return summarized_subtitles[0]["summary_text"]
