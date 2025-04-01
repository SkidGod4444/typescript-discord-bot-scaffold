# TypeScript Discord Bot Scaffold

This is a scaffold for building a Discord bot using TypeScript, Drizzle ORM, Neon DB and Bun. It provides a structured setup to help you get started quickly.

## 🚀 Features

- **Built with Bun**: Uses [Bun](https://bun.sh) for fast performance and easy dependency management.
- **TypeScript Support**: Ensures type safety and better development experience.
- **Modular Command System**: Easily extendable structure for adding commands.
- **Database Integration**: Supports database interactions for persisting data.

## 📦 Installation

First, install [Bun](https://bun.sh) if you haven't already:

```bash
curl -fsSL https://bun.sh/install | bash
```

Then, clone this repository and install dependencies:

```bash
git clone https://github.com/SkidGod4444/typescript-discord-bot-scaffold.git
cd typescript-discord-bot-scaffold
bun install
```

Then make a project on Neon DB: 

Neon DB: [console](https://console.neon.tech/)

## 🛠 Configuration

- Create a `.env` file in the root directory and add your **Discord bot token**:
  ```
  DISCORD_TOKEN=your-bot-token-here
  WEBHOOK_ERROR_LOGGING=your-discord-server-logs-channel-webhook-url-here
  DATABASE_URL=your-neon-db-database-url-here
  ```
- You may also configure other settings such as database URLs and API keys.

## ▶️ Running the Bot

To start the bot, use:

```bash
bun dev
```

## 📜 Folder Structure

```
/src
 ├── commands/      # Command handlers
 ├── events/        # Event listeners
 ├── db/            # Database setup and queries
 ├── main.ts       # Main entry point
```

## 🛠 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-branch`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💸 Sponsor

This is an open-source started kit, if you liked it then pls consider sponsoring [me here](https://l.devwtf.in/sponsor).
