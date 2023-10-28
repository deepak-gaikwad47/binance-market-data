import styled from 'styled-components';

const MarketDataContainer = styled.div`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TickerDataContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TradesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.thead`
  background-color: #f7f7f7;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const NoData = styled.div`
  margin-top: 20px;
`;

const FormContainer = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #0077b5;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Option = styled.option`
  font-size: 16px;
`;
export {
    MarketDataContainer,
    TickerDataContainer,
    TradesTable,
    TableHeader,
    TableHeaderCell,
    TableCell,
    NoData,
    FormContainer,
    Form,
    LoadingText,
    Label,
    Select,
    Button, 
    Option,
}