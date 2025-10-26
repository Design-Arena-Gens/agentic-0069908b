# AI Content Generator

A professional animated website built with Next.js, TypeScript, and Tailwind CSS, featuring Google Gemini 2.0 Flash AI integration.

## Live Demo

🚀 **Deployed at:** [https://agentic-0069908b.vercel.app](https://agentic-0069908b.vercel.app)

## Features

- 🎨 Beautiful animated UI with floating background elements
- ✨ Smooth CSS animations and transitions
- 🤖 Google Gemini 2.0 Flash AI integration
- 🎛️ Adjustable temperature control for AI responses
- 📱 Fully responsive design
- ⚡ Built with Next.js 16 and TypeScript
- 🎭 Glassmorphism design with backdrop blur effects

## Technologies Used

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Generative AI (Gemini 2.0 Flash)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Design-Arena-Gens/agentic-0069908b.git
cd agentic-0069908b
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The following environment variables are required:

- `GEMINI_API_KEY`: Your Google Gemini API key

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

## Deployment on Vercel

This project is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add the `GEMINI_API_KEY` environment variable in Vercel project settings
4. Deploy!

**Important:** Make sure to add the `GEMINI_API_KEY` environment variable in your Vercel project settings for the API to work properly.

## Project Structure

```
agentic-0069908b/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint for Gemini integration
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── public/                       # Static assets
├── .env.local                    # Environment variables (not committed)
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Features in Detail

### Animations

The website includes multiple custom CSS animations:
- Floating background circles with different speeds
- Glowing text effects on the title
- Smooth fade-in and slide-down animations
- Scale-in effects for cards
- Shake animation for error messages
- Custom slider styling with hover effects

### AI Integration

The application uses Google's Gemini 2.0 Flash model with:
- Customizable temperature control (0.0 - 1.0)
- Real-time response generation
- Error handling and user feedback
- Loading states with animated spinner

## API Endpoints

### POST /api/generate

Generate AI content using Google Gemini.

**Request Body:**
```json
{
  "prompt": "Your prompt here",
  "temperature": 0.5
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI generated content"
}
```

## Contributing

This project was built by Devin AI for Design Arena Founders.

## License

This project is private and proprietary.
