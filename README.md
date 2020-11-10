# ClassChat

ClassChat provides a simple discussion room for a teacher and their students. Developed with React and Firebase. This project was created in a couple days and was my first attempt at working with Firebase. I used this [tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/) as a boilerplate. 

## Installation

Clone Repo

Create a new Firebase project and an empty database in Firebase's Realtime Database



```npm install```

```cd src/components/firebase```

```touch secrets.js```

Add the following to secrets.js

```const config = {
  apiKey: "YOUR_API_KEY,
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MSG_SENDER_ID',
  appId: 'YOUR_APP_ID',
}

export default config
```

```npm start```


