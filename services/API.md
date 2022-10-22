# API Examples

## Posting

#### Get Posts
  - URL: `/all`
  - Method: `GET`

#### Create Post
  - URL: `/`
  - Method: `POST`
  - Body:
      ```json
      {
        "question": "",
        "questionBody": "",
        "email": "",
        "role": "",
        "class": "",
        "name": ""
      }
      ```

#### Update Post
  - URL: `/`
  - Method: `PATCH`
  - Body:
      ```json
      {
        "postDetails": {
          "question": "",
          "email": "",
          "class": "",
        },
        "question": "",
      }
      ```

#### Add Answer to Post
  - URL: `/addAnswerToPost`
  - Method: `PATCH`
  - Body:
      ```json
      {
        "postDetails": {
          "question": "",
          "email": "",
          "class": "",
        },
        "newAnswer": {
          "answer": "",
          "name": "",
          "email": "",
          "role": ""
        }
      }
      ```

#### Update Answer to Post
  - URL: `/updateAnswerToPost`
  - Method: `PATCH`
  - Body:
      ```json
      {
        "postDetails": {
          "question": "",
          "email": "",
          "class": "",
        },
        "oldAnswer": "",
        "newAnswer": ""
      }
      ```

#### Delete Post
  - URL: `/`
  - Method: `DELETE`
  - Body:
      ```json
      {
        "question": "",
        "email": "",
        "class": ""
      }
      ```

## Queueing

#### Get Queue Entries
  - URL: `/all`
  - Method: `GET`

#### Create Queue Entry
  - URL: `/`
  - Method: `POST`
  - Body:
      ```json
      {
        "class": "",
        "email": ""
      }
      ```

#### Update Queue Entry
  - URL: `/updateQueueEntry`
  - Method: `PATCH`
  - Body:
      ```json
      {
        "queueEntryDetails": {
          "class": "",
          "email": ""
        },
        "queueEntryModifications": {
          "email": ""
        }
      }
      ```

#### Remote Queue Entry
  - URL: `/`
  - Method: `DELETE`
  - Body:
      ```json
      {
        "class": "",
        "email": ""
      }
      ```

#### Empty Queue
  - URL: `/emptyQueue`
  - Method: `DELETE`
  - Body:
      ```json
      {
        "class": "",
      }
      ```

