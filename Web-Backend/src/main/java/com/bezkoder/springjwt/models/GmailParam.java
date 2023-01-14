package com.bezkoder.springjwt.models;

public class GmailParam {

    private String to;
    private String topic;
    private String body;
    private String path;

    public GmailParam(String to, String topic, String body) {
        this.to = to;
        this.topic = topic;
        this.body = body;
    }

    public String getTo() {
        return to;
    }

    public String getTopic() {
        return topic;
    }

    public String getBody() {
        return body;
    }

    public String getPath() {
        return path;
    }
}
