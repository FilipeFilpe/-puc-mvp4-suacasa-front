export function createMask(format: string) {
  return function applyMask(value: string) {
      let valueIndex = 0;
      let result = '';

      for (let i = 0; i < format.length; i++) {
          if (format[i] === '#') {
              if (value.length > valueIndex) {
                  result += value[valueIndex];
                  valueIndex++;
              } else {
                  break; // se não houver mais caracteres para preencher a máscara, paramos
              }
          } else {
              result += format[i]; // mantém caracteres fixos da máscara
          }
      }
      return result;
  };
}
