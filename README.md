# Flowva Onboarding App

> A platform for onboarding users.

## Features

Here are some of the current features that app has:

-   [x] User authentication with Google & Next Auth
-   [x] User authorization
-   [x] Route protection
-   [x] Responsive design (Tailwind)
-   [x] Custom 404 page

Rental Radar uses the following technologies:

-   [Next.js](https://nextjs.org/)
-   [React](https://reactjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [NextAuth.js](https://next-auth.js.org/)

## Getting Started

### Prerequisites

-   Node.js version 22 or higher
-   Google console account. Sign up at [Google Cloud](https://console.cloud.google.com/)

### `.env` File

Create an `.env` file and fill in the following environment variables:

-   Global app details `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_DESCRIPTION`, and `NEXT_PUBLIC_SERVER_URL`.
-   For Next-Auth `NEXTAUTH_URL` and `NEXTAUTH_URL_INTERNAL`.
-   Get your Google client ID and secret from your Google console account and add them to `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`.
-   Add a secret to `NEXTAUTH_SECRET`. You can generate with the following command:
    ```bash
    openssl rand -base64 32
    ```
-   Flowva Backend API: `NEXT_FLOWVA_API_LOGIN_ROUTE`, `NEXT_FLOWVA_API_REGISTER_ROUTE`, `NEXT_FLOWVA_API_FORGOT_PASSWORD_ROUTE`, `NEXT_FLOWVA_API_RESET_PASSWORD_ROUTE`,

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
