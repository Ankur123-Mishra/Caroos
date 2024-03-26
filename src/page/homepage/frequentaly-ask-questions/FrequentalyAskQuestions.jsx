import React, { useState } from 'react'
import '../homepage.css';
import questionsArr from './questionArr'
import Accordion from 'react-bootstrap/Accordion';
function FrequentalyAskQuestions({faqs}) {
  const itemsToShowInitially = 4;

  const [itemsToShow, setItemsToShow] = useState(itemsToShowInitially);
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setItemsToShow(faqs.length);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setItemsToShow(itemsToShowInitially);
    setShowAll(false);
  };
  return (
    
    <>
    <div className="container-fluid py-4" style={{backgroundColor:'#EDF5F9'}}>
      
      <div className="container">
      <h3 className='text-center py-3 heading'>Frequently Asked <b className='red-t'> Questions</b></h3>
        <Accordion defaultActiveKey="0" flush>
     
      {faqs.slice(0, itemsToShow)?.map((val, idx)=>(
        <Accordion.Item eventKey={idx} key={idx+1}>
        <Accordion.Header className='faq-quest'>{idx+1}. {val?.ques}</Accordion.Header>
        <Accordion.Body>
          <p className='faq-ans'>{val.answer}</p>
        </Accordion.Body>
      </Accordion.Item>
      ))}
      
    </Accordion>
  {faqs?.length>4 &&  <div className='text-end'>
    {!showAll ? (
        <button className='faq-ans' style={{border:'none',backgroundColor:'#EDF5F9'}} onClick={handleShowMore}>Show More..</button>
      ) : (
        <button className='faq-ans' style={{border:'none', backgroundColor:'#EDF5F9'}} onClick={handleShowLess}>Show Less</button>
      )}
    </div>} 
    </div>
    </div> 
    </>
  )
}

export default FrequentalyAskQuestions