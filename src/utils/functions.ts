export const onlyIntNumbers = (value: string | number) =>
  Number(String(value).replace(/\D/g, ""));

export const onlyFloatNumbers = (value: string) =>
  parseFloat(value.replace(/[^\d.-]/g, "")) | 0;

function dividirArrayPorTres(array: Array<string>) {
  const resultado = [];
  const tamanho = array.length;
  for (let i = 0; i < tamanho; i += 3) {
    resultado.push(array.slice(i, i + 3));
  }
  return resultado;
}

export function numberWithDotAndComma(number?: string | number) {
  if (!number) {
    return ''
  }
  const meuArray = String(number).replace(/\D/g, "").split('')
  
  const decimal = meuArray.slice(-2).join('')

  const reverse = meuArray.slice(0, -2).reverse();
  const arraysDivididos = dividirArrayPorTres(reverse);
  const result = arraysDivididos.map(item => item.reverse().join(''))
  return result.reverse().join('.')+','+decimal
}

export function floatFormat(number?: string | number) {
  if (!number) {
    return
  }
  
  return parseFloat(String(number).replaceAll('.', '').replaceAll(',', '.'))
}