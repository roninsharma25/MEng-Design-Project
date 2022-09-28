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

