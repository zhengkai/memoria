package ban

import (
	"project/config"
	"project/pb"
)

func init() {

	go func() {
		b := &ban{}
		b.init()
		theBan = b
		// b.Data = loadData()
	}()

}

func (b *ban) init() {

	b.Map = make(map[string]*pb.BanRow)
	b.ch = make(chan string, 100)
	defer func() {
		go b.listenAdd()
	}()
	err := file.ReadJSON(&b.Data)
	if err != nil {
		return
	}

	if b.Data.GetHost() != config.HostName {
		b.Data.SetList(nil)
	}
	b.Data.SetHost(config.HostName)
	for _, v := range b.Data.GetList() {
		b.Map[v.GetIp()] = v
	}
	b.genNewRead()
}
