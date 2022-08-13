import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { findRandomUser, findUser } from "../apis/userApi";
import { colorSet, fadeAction } from "../style/global";
import Layout from "./Layout";
import UserBox from "../components/find/UserBox";
import Loading from "../components/Loading";
import NumberCarousel from "../components/common/NumberCarousel";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { useDispatch } from "react-redux";
import { FindUserIdUpdate } from "../redux/reducers/findUserReducer";

export default function Find() {
  const [findUserId, setFindUserId] = useState<string>("");
  const [userList, setUserList] = useState<any[]>([]);
  const [resultMsg, setResultMsg] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const [randomResult, setRandomResult] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(16);

  const storedId = useSelector((state: RootState) => state.findUserReducer);
  const dispatch = useDispatch();

  //스토어에 아이디가 있을 경우 자동 검색
  useEffect(() => {
    if (storedId.userId) {
      handleFindStoredUser(storedId.userId);
      dispatch(FindUserIdUpdate(""));
    }
  }, []);

  //번호선택 및 범위지정
  const handleSetPage = (page: number) => {
    setStart((page - 1) * 16);
    setEnd(page * 16);
    setPage(page);
  };

  //사람찾기 실행
  const handleFindUser = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setIsLoading(true);

    //*아이디값이 truthy하고 공백이 아닌 경우
    if (findUserId) {
      findUser(findUserId).then((res) => {
        handleSetPage(1);
        setIsLoading(false);
        setRandomResult(false);
        setResultMsg(true);
        setSearchWord(findUserId);

        if (res.data.ok) {
          if (res.data.userInfo) {
            setUserList(res.data.userInfo);
          }
        } else {
          //?DB상에 검색되는 아이디/닉네임이 없는 경우
          setUserList([]);
          Swal.fire({
            title: "찾으시는 아이디/닉네임이 없어요",
            icon: "warning",
            confirmButtonText: "닫기",
          });
        }
      });
    } else {
      setIsLoading(false);
      setUserList([]);
      setResultMsg(false);
      setRandomResult(false);
    }
  };

  //스토어에 아이디가 있을 경우 사람찾기 실행
  const handleFindStoredUser = (id: string): void => {
    setIsLoading(true);

    findUser(id).then((res) => {
      handleSetPage(1);
      setIsLoading(false);
      setRandomResult(false);
      setResultMsg(true);
      setSearchWord(id);
      if (res.data.userInfo) {
        setUserList(res.data.userInfo);
      }
    });
  };

  //랜덤으로 유저 찾아주기
  const handleRandomFind = () => {
    setIsLoading(true);

    Swal.fire({
      title: "랜덤으로 유저를 추천해드립니다",
      icon: "info",
      showDenyButton: true,
      confirmButtonText: "오! 좋아요",
      denyButtonText: "안할래요",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSetPage(1);
        setResultMsg(false);
        findRandomUser().then((res) => {
          setIsLoading(false);
          setUserList(res.data);
          setRandomResult(true);
        });
      } else if (result.isDenied) {
        setIsLoading(false);
      }
    });
  };

  //인풋박스 입력값 상태로 업데이트
  const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFindUserId(e.target.value);
  };

  return (
    <Layout title={"친구 찾기"}>
      <SearchBarWrapper onSubmit={handleFindUser}>
        <SubWrapper>
          <SearchBar
            onChange={handleUserIdInput}
            type="text"
            placeholder="아이디 또는 닉네임을 입력해주세요"
          />
          <button>
            <img
              src="https://cdn.discordapp.com/attachments/974114424036155505/979187559706001428/search_base.png"
              alt=""
            />
          </button>
        </SubWrapper>
        <Title onClick={handleRandomFind}>새로운 친구를 찾아보고 싶다면?</Title>
      </SearchBarWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <MainContainer>
          {resultMsg ? (
            <SearchResult>
              "{searchWord}" 검색어로 {userList.length}개의 검색결과가 있습니다.
            </SearchResult>
          ) : (
            ""
          )}
          {randomResult ? (
            <SearchResult>아래 친구의 공간에 방문해보면 어떨까요?</SearchResult>
          ) : (
            ""
          )}
          {userList.length === 0 ? (
            ""
          ) : (
            <PageNumber>
              <NumberCarousel
                giftListData={userList}
                page={page}
                handleSetPage={handleSetPage}
                color={"black"}
                pageLimit={16}
              />
            </PageNumber>
          )}
          <UserBoxWrapper>
            {userList?.slice(start, end).map((el, idx) => {
              return <UserBox data={el} key={idx} />;
            })}
          </UserBoxWrapper>
        </MainContainer>
      )}
    </Layout>
  );
}

const MainContainer = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const Title = styled.div`
  font-family: "Jua", sans-serif;
  font-size: 17px;
  display: flex;
  justify-content: center;
  color: ${colorSet.base};
  cursor: pointer;

  :hover {
    color: ${colorSet.pink};
  }
`;

const UserBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 15px;
  gap: 25px;
`;

const SearchBarWrapper = styled.form`
  position: fixed;
  top: 50px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 12px 20px;
  gap: 10px;
  background: #9e9e9e52;
  color: white;
  margin-bottom: 50px;
  animation: ${fadeAction} 0.6s ease-in-out;

  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
  }

  img {
    width: 30px;
  }
`;

const SubWrapper = styled.div`
  display: flex;
`;

const SearchBar = styled.input`
  height: 45px;
  width: 390px;
  margin-left: 30px;
  padding-left: 10px;
  border-radius: 10px;
  border: 2px solid ${colorSet.base};
  font-size: 16px;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-family: "Hanna", sans-serif;
    font-size: 16px;
    color: ${colorSet.purple};
  }
`;

const SearchResult = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 140px;
  display: flex;
  justify-content: center;
  font-family: "Hanna", sans-serif;
  color: ${colorSet.base};
`;

const PageNumber = styled.div`
  width: 1095px;
  display: flex;
  justify-content: center;
  gap: 5px;
  color: white;
  margin-top: 20px;
  font-weight: 200;
`;
