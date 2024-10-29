import colors from 'colors';

export function displayHeader() {
  process.stdout.write('\x1Bc');
  console.log(colors.cyan('========================================'));
  console.log(colors.cyan('=        RWA Auto Claim Bot         ='));
  console.log(colors.cyan('=     Created by HappyCuanAirdrop      ='));
  console.log(colors.cyan('=    https://t.me/HappyCuanAirdrop     ='));
  console.log(colors.cyan('========================================'));
  console.log();
}
