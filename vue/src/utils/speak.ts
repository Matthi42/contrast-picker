export  const speak = async (text: string, lang: 'de'|'en') => {
   let language = 'german'
   switch(lang){
      case 'de':
         language = 'german'
         break
      case 'en':
         language = 'english'
         break
      }
   await Neutralino.os.execCommand(`espeak-ng -v ${language} -s 150 -p 60 "${text}"`)
}