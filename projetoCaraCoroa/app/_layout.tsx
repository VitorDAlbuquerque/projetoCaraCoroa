import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, Button, View } from "react-native";
import { Picker } from "@react-native-picker/picker"; 
import styles from "./src/FormsStyle";
import { Image } from "react-native";


export default function HomePage() {
  
  const [ganhador, setGanhador] = useState('');
  const [msg, setMsg] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [taxa, setTaxa] = useState<number | null>(null);
  const [taxaDerrota, setTaxaDerrota] = useState<number | null>(null);
  const [contador, setContador] = useState<number | null>(null);
  const [contadorVitoria, setContadorVitoria] = useState<number | null>(null);
  const [contadorDerrota, setContadorDerrota] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState(''); 
  
  const [img, setImg] = useState('');



  const sorteio = () => {
    setContador((contador ?? 0) + 1);
    const num = Math.floor(Math.random() * 2); 
    setResultado(num)

    setTaxa(((contadorVitoria ?? 0) / (contador ?? 0)) * 100);
    setTaxaDerrota(((contadorDerrota ?? 0) / (contador ?? 0)) * 100);
if(selectedValue === 'Cara'){
  setImg(require('../assets/images/cara.png'));
}else{
  setImg(require('../assets/images/coroa.png'));
}
  
    if(num === 0){
        setGanhador('Cara');
       
    }else{
      setGanhador('Coroa');
  
    }

    if(selectedValue === ganhador){
      setMsg('Você ganhou!');
      setContadorVitoria((contadorVitoria ?? 0) + 1);
    }else{
      setMsg('Você perdeu!');
      setContadorDerrota((contadorDerrota ?? 0) + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Escolha cara ou coroa:</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Cara" value="Cara" />
        <Picker.Item label="Coroa" value="Coroa" />
      
      </Picker>
      <View style={styles.selectedValueContainer}>
        <Text>
          Lado escolhido: {selectedValue}
        </Text>
      </View>

      <Image source={img} style={{ width: 100, height: 100, alignSelf: 'center' }} />

      <View style={styles.selectedValueContainer}>
        <Text>
           {msg}
        </Text>
      </View>
    
      <View style={styles.selectedValueContainer}>
        <Text>
        <Text style={styles.resultado}>Contador: {contador}</Text>
        
        </Text>
      </View>

      <View style={styles.selectedValueContainer}>
        <Text>
        <Text >Taxa de vitoria: {taxa}%</Text>
        </Text>
        <Text>
        <Text >Taxa de derrota: {taxaDerrota}%</Text>
        </Text>
      </View>

        

  
      <Button title="Sortear" onPress={sorteio} />
      {erro ? <Text style={styles.error}>{erro}</Text> : null}
      {resultado !== null && (
        <Text style={styles.resultado}>Resultado: {ganhador}</Text>
      )}
    </SafeAreaView>
  );
}