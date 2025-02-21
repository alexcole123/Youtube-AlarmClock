<<<<<<< HEAD
# Youtube-AlarmClock
=======
# YouTube Alarm Clock

A web application that lets you set alarms using YouTube videos. Wake up to your favorite music or content!

## Features
- 24-hour digital clock display
- YouTube video search integration
- Custom alarm time settings
- Video preview functionality
- Responsive design for all devices

## Setup
1. Clone the repository
```bash
git clone //place git URL
```

2. Create a `.env` file in the root directory:
```
YOUTUBE_API_KEY=your_youtube_api_key_here
```

3. Get a YouTube API key:
- Go to the [Google Cloud Console](https://console.cloud.google.com)
- Create a new project or select an existing one
- Enable the YouTube Data API v3
- Create credentials (API key)
- Copy the API key to your `.env` file

4. Open `alarm.html` in your browser

## Project Structure
- `alarm.html` - Main HTML file
- `style.css` - Styles and layout
- `main.js` - Application logic
- `config.js` - Configuration settings

## Security Note
Never commit your actual API key to the repository. Always use environment variables for sensitive data.
>>>>>>> 541655c (Initial Commit)
