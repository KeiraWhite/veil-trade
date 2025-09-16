# Vercel Deployment Guide for Veil Trade

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare your environment configuration

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"** or **"Add New..."** → **"Project"**
3. Import your GitHub repository:
   - Find `KeiraWhite/veil-trade` in the list
   - Click **"Import"**

### Step 2: Configure Project Settings

1. **Project Name**: `veil-trade` (or your preferred name)
2. **Framework Preset**: Select **"Vite"**
3. **Root Directory**: Leave as `./` (default)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Environment Variables

Click **"Environment Variables"** and add the following:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_endpoint_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
NEXT_PUBLIC_RPC_URL=your_alternative_rpc_url
```

**Important**: 
- Add each variable separately
- Set **Environment** to **"Production"** for all variables
- Optionally add to **"Preview"** and **"Development"** if needed

### Step 4: Deploy

1. Click **"Deploy"** button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your app will be available at the provided Vercel URL

### Step 5: Custom Domain (Optional)

1. Go to **"Settings"** → **"Domains"**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### 1. Verify Environment Variables

Check that all environment variables are properly set:
- Go to **"Settings"** → **"Environment Variables"**
- Ensure all variables are present and have correct values

### 2. Test Wallet Connection

1. Visit your deployed app
2. Click **"Connect Wallet"** button
3. Test with different wallet providers (MetaMask, Rainbow, etc.)
4. Verify network switching works correctly

### 3. Monitor Performance

1. Go to **"Analytics"** tab in Vercel dashboard
2. Monitor page views, performance metrics
3. Check **"Functions"** tab for any serverless function logs

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

2. **Environment Variables Not Working**:
   - Double-check variable names (case-sensitive)
   - Ensure variables are set for correct environment
   - Redeploy after adding new variables

3. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URLs are accessible
   - Ensure chain ID matches your configuration

4. **Network Issues**:
   - Verify RPC endpoints are working
   - Check if Infura API key has sufficient quota
   - Test with different RPC providers

### Performance Optimization

1. **Enable Edge Functions** (if applicable):
   - Go to **"Functions"** → **"Edge Functions"**
   - Enable for better global performance

2. **Configure Caching**:
   - Add appropriate cache headers
   - Use Vercel's built-in caching for static assets

3. **Monitor Bundle Size**:
   - Check build output for large dependencies
   - Consider code splitting for better performance

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate API keys regularly

2. **HTTPS**:
   - Vercel automatically provides HTTPS
   - Ensure all external API calls use HTTPS

3. **CORS Configuration**:
   - Configure CORS headers if needed
   - Restrict access to necessary domains only

## Monitoring and Maintenance

### Regular Checks

1. **Uptime Monitoring**:
   - Set up uptime monitoring (UptimeRobot, Pingdom)
   - Monitor Vercel's status page

2. **Performance Monitoring**:
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Check for performance regressions

3. **Security Updates**:
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update environment variables as needed

### Backup Strategy

1. **Code Backup**:
   - GitHub repository serves as primary backup
   - Regular commits and pushes

2. **Environment Backup**:
   - Document all environment variables
   - Keep secure copies of API keys

## Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **RainbowKit Documentation**: [rainbowkit.com](https://rainbowkit.com)
- **Wagmi Documentation**: [wagmi.sh](https://wagmi.sh)

## Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Project settings configured
- [ ] Environment variables added
- [ ] Build successful
- [ ] Wallet connection working
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Monitoring set up
- [ ] Documentation updated

## Next Steps

After successful deployment:

1. **Test all functionality** thoroughly
2. **Share the URL** with stakeholders
3. **Set up monitoring** and alerts
4. **Plan for scaling** as user base grows
5. **Consider CI/CD** for automated deployments
