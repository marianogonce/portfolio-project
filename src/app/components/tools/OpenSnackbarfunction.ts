

export function openSnackBar(_snackBar : any, message:string, color: string, action?:string) {
   _snackBar.open(message, action, {
    duration: 4000,panelClass: [color]
  });
}