{ pkgs, ... }:

{
  # https://devenv.sh/basics/
  env.NODE_OPTIONS = "--openssl-legacy-provider";

  # https://devenv.sh/packages/
  packages = [
    pkgs.git
    pkgs.nodejs
  ];

  enterShell = ''
    hello
    git --version
  '';

  # https://devenv.sh/languages/
  languages.javascript.enable = true;

  # https://devenv.sh/scripts/

  # https://devenv.sh/pre-commit-hooks/
  pre-commit.hooks.shellcheck.enable = true;

  # https://devenv.sh/processes/
  # processes.ping.exec = "ping example.com";
}
