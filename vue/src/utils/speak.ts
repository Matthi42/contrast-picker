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
   const process = await Neutralino.os.spawnProcess(`espeak-ng -v ${language} -s 150 -p 60 "${text}"`)
   return () => Neutralino.os.updateSpawnedProcess(process.id, 'exit')
}