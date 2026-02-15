# Gemini Clone with OpenRouter API

A React-based chat application powered by OpenRouter API. No backend server required!

## Features

- Direct API calls to OpenRouter (no backend needed)
- Real-time streaming text animation
- Chat history
- Clean, modern UI

## Setup

### 1. Get OpenRouter API Key

1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Sign up and log in
3. Get your API key from the [Keys page](https://openrouter.ai/keys)

### 2. Configure Environment

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your OpenRouter API key:

```
VITE_OPENROUTER_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available OpenRouter Models

You can change the model in `src/utils/openrouter.js`:

```javascript
model: "openrouter/auto"  // Auto selects the best available model
```

Other options:
- `"openrouter/auto"` - Auto-selects best model (default)
- `"gpt-4-turbo"` - OpenAI GPT-4 Turbo
- `"gpt-3.5-turbo"` - OpenAI GPT-3.5
- `"claude-3-opus"` - Anthropic Claude 3 Opus
- And many more...

See [OpenRouter Models](https://openrouter.ai/docs/models) for the full list.

## Project Structure

```
src/
├── components/
│   ├── Main/
│   │   ├── Main.jsx
│   │   └── Main.css
│   └── Sidebar/
│       ├── Sidebar.jsx
│       └── Sidebar.css
├── context/
│   └── Context.jsx          # Chat logic (uses OpenRouter API)
├── utils/
│   └── openrouter.js        # OpenRouter API helper
├── App.jsx
├── main.jsx
└── index.css
```

## How It Works

1. User types a question in the input box
2. React sends request directly to OpenRouter API (via `callOpenRouter()` in `src/utils/openrouter.js`)
3. Response streams back character by character with animation
4. Chat history is saved in React state

## Troubleshooting

### "API key not found" error

Make sure you've created `.env.local` with your OpenRouter API key:

```bash
VITE_OPENROUTER_API_KEY=your_api_key_here
```

### "Something went wrong" error

Check the browser console (F12) for detailed error messages. Common issues:
- Invalid API key
- Quota exceeded on OpenRouter
- Network issues

## No Server Required!

This project runs entirely on the frontend. No Express server, no Node.js backend in production.

## Build for Production

```bash
npm run build
```

The build output is in the `dist/` folder.

## License

MIT
