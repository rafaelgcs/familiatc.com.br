import { Card } from '@mui/material';

import { useEffect, useState } from 'react';
import FAQsTable from './FAQsTable';
import { FAQModel } from '@/models/faq';
import { getFAQList } from '@/repositories/faqs';

function ContentView() {

  const [faqs, setFAQs] = useState<FAQModel[]>([])

  const _getAllFAQs = async () => {
    let resp = await getFAQList()

    if (resp.success) {
      setFAQs(resp.data)
    }
  }

  useEffect(() => {

    _getAllFAQs()
  }, [])

  return (
    <Card>
      <FAQsTable reloadFAQs={() => _getAllFAQs()} faqs={faqs} />
    </Card>
  );
}

export default ContentView;
