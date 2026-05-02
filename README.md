# Instagram Unfollowers

Find out who you follow on Instagram that doesn't follow you back, entirely in your browser. No logins, no API keys, no data leaving your device.

## How it works

1. Export your Instagram data as JSON (see [the in-app guide](http://localhost:3000/how-to-export) or the steps below)
2. Upload `followers_1.json` and `following.json`
3. Click **Run Analysis** — results appear instantly

All processing runs client-side via the FileReader API. Nothing is sent to a server.

## Getting your Instagram data export

1. Open Instagram → **Settings** → **Your activity** → **Download your information** → **Download or transfer information**
2. Select **Some of your information**
3. Under **Connections**, check **Followers and following**
4. Click **Next** → **Download to device**
5. Set date range to **All time**, format to **JSON**
6. Request the download — Instagram emails you a link within minutes
7. Unzip the archive and locate:
   - `followers_and_following/followers_1.json`
   - `followers_and_following/following.json`

## Running locally

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # production build
npm run lint      # ESLint
```

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Runtime | React 19 |

## Project structure

```
app/
  page.tsx              # main upload + results page
  how-to-export/        # step-by-step export instructions page
  globals.css           # Tailwind theme tokens + animations
components/
  UploadZone.tsx        # drag-and-drop / click-to-upload card
hooks/
  useInstagramAnalysis.ts   # all state + file handling logic
  useUploadZone.ts          # drag-and-drop event handlers
utils/
  instagram.ts          # JSON parsing + unfollower diff
types/
  instagram.ts          # shared TypeScript types
styles/
  page.css              # supplemental CSS for pseudo-elements
```

## Instagram JSON formats

Both export files share the same shape:

```json
[
  {
    "string_list_data": [
      { "href": "https://www.instagram.com/username", "value": "username", "timestamp": 1234567890 }
    ]
  }
]
```

`following.json` wraps the array in `{ "relationships_following": [...] }` and stores the username in `title` rather than `string_list_data[0].value`. The parser handles both shapes automatically.
