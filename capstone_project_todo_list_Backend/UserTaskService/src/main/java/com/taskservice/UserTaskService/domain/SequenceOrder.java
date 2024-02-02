package com.taskservice.UserTaskService.domain;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sequences")
public class SequenceOrder {

    @Id
    private String id;
    private Integer seq;

    public SequenceOrder() {}

    public SequenceOrder(String id, Integer seq) {
        this.id = id;
        this.seq = seq;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }
}

