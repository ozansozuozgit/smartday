'use client';
const DateRangeDisplay = ({ startDate, endDate }: any) => {

    const formattedStartDate = startDate.toLocaleDateString();
  const formattedEndDate = endDate.toLocaleDateString();

  return (
    <div className='text-gray-600'>
      Selected Date Range: {formattedStartDate} - {formattedEndDate}
    </div>
  );
};

export default DateRangeDisplay;
