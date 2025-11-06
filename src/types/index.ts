type CepData = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location?: {
    type: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
};


type MessageCepReturn = {
    message: string,
    error: boolean,
    data: CepData | null,
    source: null | string
}


export {
    CepData,
    MessageCepReturn
}