import { useContext, useEffect, useState } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApiService } from 'services/api.service';
import Header from 'components/Header';

const Custom = () => {
  const apiService = new ApiService();
  // const { } = useContext(UsersContext);
  const [hours, setHours] = useState({});
  const [loading, setLoading] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setLoading('Agurade...');
    console.log(hours)

    try {
      // const { data } = await apiService.put('/admin/company/openinghours', hours);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   setHours(provider?.workingHours);
  // }, [openingHours]);

  return (
    <>
    <Header 
      title="Disponibilidade de horário" 
      description="" 
      back={-1} 
    />

    <section>
      
    </section>
    </>

  );
};

export default Custom;
