# Deployment Guide: React & Vite Portfolio

This guide outlines how to deploy your modern React + Vite portfolio application onto two of the most popular and scalable cloud hosting environments: **Vercel (via GitHub)** and **Google Cloud Run (using Docker)**.

---

## Technical Overview
* **Architecture:** Client-Side Single Page Application (SPA)
* **Framework:** React 19 + TypeScript
* **Build Tool:** Vite 6
* **Styling:** Tailwind CSS V4
* **Output Artifact:** Compile-to-static directory (`dist/`)

---

## Option 1: Deploying to Vercel (via GitHub)
Vercel is the recommended hosting platform for static assets and Single Page Applications. It provides global CDN delivery, automatic SSL certificates, and git-triggered preview/production deployments.

### Step 1: Push Your Code to GitHub
Ensure your repository is loaded into GitHub with the proper structure. Since you fixed your project structure earlier, your `package.json` should reside in the root of the repository.

1. Initialize a Git repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initialize portfolio project"
   ```
2. Connect your local repository to your GitHub repository:
   ```bash
   git remote add origin https://github.com/reyhostingtech/portfolio.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com/) and log in (using your GitHub account is recommended).
2. Click the **Add New...** button and select **Project**.
3. Locate `reyhostingtech/portfolio` in your GitHub repository list and click **Import**.
4. Vercel will automatically detect **Vite** as your framework.
5. Review the preset Build Settings (they should be correct by default):
   * **Framework Preset:** `Vite`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
   * **Install Command:** `npm install` or `npm ci`
6. Click **Deploy**. Vercel will build your application and provide a production domain (e.g., `https://portfolio-yourname.vercel.app`).

### (Optional) SPA Routing Configuration
If you add client-side routers (like `react-router`) in the future, deep-linked URLs might return `404` errors on refresh because Vercel looks for individual HTML files. You can fix this by creating a `vercel.json` file in your root directory:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Option 2: Deploying to Google Cloud Run
Google Cloud Run is a fully managed serverless environment that allows you to run stateless containers. This is excellent for custom infrastructure, enterprise scaling, or if you prefer keeping your web components consolidated inside Google Cloud Platform (GCP).

### Recommended: Production Nginx Dockerfile
For static SPAs, the industry standard is a **multi-stage Docker build**. In the first stage, Node compiles the site. In the second stage, a lightweight Nginx web server serves the static assets. This keeps your container image incredibly small (~25MB), fast to load, and extremely secure.

Create a file named `Dockerfile` in your project root:

```dockerfile
# Step 1: Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Step 2: Production Stage
FROM nginx:alpine
# Copy built files from builder step to Nginx server directory
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy standard custom Nginx configuration if SPA routing is required
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

If you use the Nginx configuration above, create an `nginx.conf` in your project root to handle SPA fallbacks and ensure correct asset delivery:

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

---

### Step-by-Step Google Cloud Run Deployment

To deploy this container to Google Cloud Run, execute the following commands in your terminal (using the Google Cloud CLI):

#### Step 1: Enable Google Cloud Services
Enable the Artifact Registry and Cloud Build APIs in your GCP project:
```bash
gcloud services enable artifactregistry.googleapis.com run.googleapis.com cloudbuild.googleapis.com
```

#### Step 2: Create a Docker Artifact Registry Repository
Create an Artifact Registry repository to host your container image:
```bash
gcloud artifacts repositories create portfolio-repo \
    --repository-format=docker \
    --location=us-central1 \
    --description="Docker repository for portfolio website"
```

#### Step 3: Build & Submit container via Cloud Build
Let Google Cloud build your container remotely (useful if you do not have Docker running locally):
```bash
gcloud builds submit --tag us-central1-docker.pkg.dev/[PROJECT_ID]/portfolio-repo/portfolio-image:latest
```
*(Replace `[PROJECT_ID]` with your actual Google Cloud Project ID).*

#### Step 4: Deploy to Cloud Run
Deploy the built container image to Cloud Run:
```bash
gcloud run deploy portfolio-service \
    --image=us-central1-docker.pkg.dev/[PROJECT_ID]/portfolio-repo/portfolio-image:latest \
    --platform=managed \
    --region=us-central1 \
    --allow-unauthenticated
```

Cloud Run will output a public URL (e.g., `https://portfolio-service-abcde-uc.a.run.app`) where your portfolio is live!

---

## Troubleshooting Local Development Environments

Here are standard quick fixes for the developer configuration issues you ran into previously:

### Fix for: `PowerShell execution policy blocks script loading`
If you receive a security policy error on Windows when running `npm`, run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Alternatively, bypass PowerShell script blocks by utilizing `npm.cmd install` or `npm.cmd run dev` directly as you successfully did.

### Fix for: `npm error code ENOENT (no such file or directory)`
If npm complains about missing `package.json`, establish which directory you are inside. Your folder hierarchy was nested under `portfolio-main/portfolio-main`. 
* Use the change directory command `cd portfolio-main` to move into the directory where `package.json` actually exists before running your install or build commands.
