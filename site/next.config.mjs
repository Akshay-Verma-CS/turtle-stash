const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/turtle-stash" : "",
  assetPrefix: isGitHubPages ? "/turtle-stash/" : "",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
