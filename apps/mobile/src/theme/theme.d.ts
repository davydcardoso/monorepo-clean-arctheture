export default interface AppThemeDto {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    primary_foreground: string;
    secondary: string;
    secondary_foreground: string;
    destructive: string;
    destructive_foreground: string;
    input: string;
    ring: string;
  };
  borders: {
    color: string;
    radius: string;
  };
}
