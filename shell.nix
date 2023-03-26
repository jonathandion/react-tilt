{ system ? builtins.currentSystem, pkgs ? import <nixpkgs> { inherit system; } }:

pkgs.mkShell
{
  buildInputs = with pkgs; [
    nodejs
    nodePackages_latest.pnpm
  ];
  shellHook = ''
    echo "Using nodejs version: $(node --version)"
    echo "Using pnpm version: $(pnpm --version)"
  '';
}
