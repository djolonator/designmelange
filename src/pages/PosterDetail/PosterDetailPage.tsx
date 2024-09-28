import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// interface PosterDetailPageProps {
//     designId: number
//   }


const PosterDetailPage:React.FC = () => {

    const {designId } = useParams<{designId: string }>();

    return (
        <>
           
        </>
    )
}

export default PosterDetailPage;