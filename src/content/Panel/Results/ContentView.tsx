import { Card } from '@mui/material';

import { useEffect, useState } from 'react';
import { getResultList } from '@/repositories/results';
import { ResultModel } from '@/models/result';
import ResultsTable from './ResultsTable';

function ContentView() {

  const [results, setResults] = useState<ResultModel[]>([])

  const _getAllResults = async () => {
    let resp = await getResultList()

    if (resp.success) {
      setResults(resp.data)
    }
  }

  useEffect(() => {

    _getAllResults()
  }, [])

  return (
    <Card>
      <ResultsTable reloadResults={() => _getAllResults()} results={results} />
    </Card>
  );
}

export default ContentView;
