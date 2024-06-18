# Chat-Messenger Schulprojekt

Dieses Projekt ist ein Chat-Messenger, der mithilfe von Vite, React und TypeScript erstellt wurde. Für das Styling wurde TailwindCSS verwendet, und für das Routing die Library React Router Dom. Das Backend basiert auf Firebase, einschließlich der Authentication und Firestore Database zur Speicherung von Benutzerinformationen, Nachrichten und Chats. Für einzelne Komponente wurden Styling-Libraries wie Flowbite genutzt. Diese übernehmen **keine Logik** im Projekt und sind nur für das Design verantwortlich.

## Technologien

- **Frontend:**

  - Vite
  - React
  - TypeScript
  - TailwindCSS
  - React Router Dom

- **Backend:**
  - Firebase Authentication
  - Firestore Database

## Struktur

### Frontend

#### Vite und React

Das Projekt nutzt Vite als Build-Tool und React für die Benutzeroberfläche.

#### TailwindCSS

TailwindCSS wird für das Styling verwendet, was ein schnelles und modulares Styling ermöglicht. Es ist ähnlich wie CSS, jedoch wird es innerhalb von Klassen verwendet, sodass keine extra Dateien dafür benötigt werden.

#### React Router Dom

Für das Routing innerhalb wird React Router Dom verwendet, um verschiedene Seiten und Ansichten zu navigieren (.../login, .../register, etc.).

### Backend

#### Firebase Authentication

Firebase Authentication wird verwendet, um Benutzer per E-Mail und Passwort zu authentifizieren. User können zudem auch in der Theorie direkt über Firebase angelegt und entfernt werden.

#### Firestore Database

Firestore dient zur Speicherung der Benutzerinformationen, Nachrichten und Chats. Es gibt drei Haupt-Collections:

- **users:**

  - Speichert die Benutzerinformationen wie E-Mail, Displayname und UID.
  - Beispiel-Dokument:
    ```json
    {
      "email": "user@example.com",
      "displayName": "John Doe",
      "uid": "uniqueUserId123"
    }
    ```

- **userChats:**

  - Speichert die Chats zwischen zwei Personen, einschließlich der IDs der beteiligten Benutzer.
  - Das Dokument ist nach einer Kombination der SenderID und EmpfängerID benannt.
  - Beispiel-Dokument:

    ```json
    {
      "date": "17 June 2024 at 14:47:15 UTC+2",
      "userInfo": [
        {
          "displayName": "John Doe",
          "uid: ": "uniqueUserId456"
        }
      ]
    }
    ```

- **chats:**
  - Speichert die Nachrichten innerhalb eines Chats.
  - Das Dokument ist nach einer Kombination der SenderID und EmpfängerID benannt.
  - Beispiel-Dokument:
    ```json
    {
      "messages": [
        {
          "id": "uid22",
          "senderId": "uid1",
          "text": "Hello!",
          "date": "2023-06-18T12:34:56Z"
        },
        {
          "id": "uid11",
          "senderId": "uid2",
          "text": "Hi there!",
          "date": "2023-06-18T12:35:00Z"
        }
      ]
    }
    ```

## Installation und Setup

### Voraussetzungen

- Node.js und npm müssen installiert sein.
- Ein Firebase-Projekt muss erstellt und konfiguriert sein.

### Schritte

1.  **Repository klonen:**

    ```sh
    git clone https://github.com/EduardDoronin/messenger.git
    cd messanger
    ```

2.  **Abhängigkeiten installieren:**

    ```sh
    npm install
    ```

3.  **Firebase konfigurieren:**

    - Firebase-Projekt erstellen und die Firebase Config in einer `.env`-Datei speichern.
    - Beispiel `.env`-Datei:
      ```env
      VITE_FIREBASE_API_KEY=your-api-key
      VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
      VITE_FIREBASE_PROJECT_ID=your-project-id
      VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
      VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
      VITE_FIREBASE_APP_ID=your-app-id
      ```

4.  **Entwicklungsserver starten:**
    ```sh
    npm run dev
    ```

## Nutzung

- **Registrierung und Anmeldung:**
  - Benutzer können sich per E-Mail und Passwort registrieren und anmelden.
- **Chat-Funktionalitäten:**
  - Benutzer können Nachrichten senden und empfangen.
  - Chats zwischen zwei Benutzern werden gespeichert und angezeigt.
  - Die Anmeldung wird im Localstorage gespeichert

## Beachten Sie bitte

Wir sind keine Designer, haben jedoch unser bestes gegeben, das Projekt halbwegs gut aussehen zu lassen. Aus diesem Grund bitten wir Sie, bei der bewertung, das Aussehen der UI zu ignorieren.

## Sonstige Informationen

Das Projekt wurde innerhalt von 8 Tagen fertiggestellt (dazu gehört NICHT die Dokumentation). Begonnen wurde auf einem ASAP-Internen Repository, jedoch wurde anschließend auf ein privates Repo gewechselt, da wir das ASAP-Repo nicht öffentlich machen durften. Screenshots zum Commitverlauf auf dem ASAP-Repo sind ebenfalls vorhanden.
