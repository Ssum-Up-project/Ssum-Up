from transformers import pipeline


def summarize(subtitles):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summarized_subtitles = summarizer(
        subtitles, max_length=300, min_length=30, do_sample=False
    )

    return summarized_subtitles[0]["summary_text"]
