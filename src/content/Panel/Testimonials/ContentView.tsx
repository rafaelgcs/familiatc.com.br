import { Card } from '@mui/material';

import { useEffect, useState } from 'react';
import TestimonialsTable from './TestimonialsTable';
import { TestimonialModel } from '@/models/testimonial';
import { getTestimonialsList } from '@/repositories/testimonials';

function ContentView() {

  const [testimonials, setTestimonials] = useState<TestimonialModel[]>([])

  const _getAllTestimonials = async () => {
    let resp = await getTestimonialsList()

    if (resp.success) {
      setTestimonials(resp.data)
    }
  }

  useEffect(() => {

    _getAllTestimonials()
  }, [])

  return (
    <Card>
      <TestimonialsTable reloadTestimonials={() => _getAllTestimonials()} testimonials={testimonials} />
    </Card>
  );
}

export default ContentView;
