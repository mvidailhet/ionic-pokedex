export class Utils {

  static removeSpecialCharacters(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

}
