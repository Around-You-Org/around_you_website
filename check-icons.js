import * as lucide from 'lucide-react';

console.log(Object.keys(lucide).filter(k => k.toLowerCase().includes('insta') || k.toLowerCase().includes('twitter') || k.toLowerCase().includes('linkedin') || k.toLowerCase().includes('facebook')).sort());