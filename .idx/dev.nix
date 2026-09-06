# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
  ];

  # Sets environment variables in the workspace
  env = {};

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [];

    # Enable previews and configure how to serve
    previews = {
      enable = true;
      previews = {
        web = {
          # Runs production build and serves 'dist' folder directly as Document Root
          command = [
            "sh"
            "-c"
            "npm run build && npx vite preview --port $PORT --host 0.0.0.0 --outDir dist"
          ];
          manager = "web";
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      onCreate = {
        npm-install = "npm install";
        build = "npm run build";
      };
      onStart = {
        build = "npm run build";
      };
    };
  };
}
