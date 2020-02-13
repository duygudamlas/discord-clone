import React, { useState, Fragment } from "react";
import "./Channels.scss";
import Channel from "./Channel";
import AddModal from "../AddModal/AddModal";
import firebase from "../../../firebase";
import UserBar from "../UserBar/UserBar";
import { Category } from "emoji-mart";

class Channels extends React.Component {
	state = {
		showDropdown: false,
		addModal: null
	};

	objToArray = obj => {
		const keys = Object.keys(obj || {});
		const arr = keys.map(key => ({
			...obj[key],
			key
		}));
		return arr;
	};

	displayChannels = () => {
		const categories = this.objToArray(this.props.selectedServer.category);

		return categories.map(category => {
			const channels = this.objToArray(category.channels);
			return (
				<div className="category" key={category.key}>
					<h3>{category.name}</h3>
					{channels.map(channel => (
						<Channel
							active={channel.key === this.props.selectedChannel.id}
							id={channel.key}
							channel={channel}
							key={channel.key}
							onClick={() => this.handleChannelClick(channel)}
						/>
					))}
				</div>
			);
		});
	};

	handleChannelClick = channel => {
		this.props.changeCurrentSelected({
			channel: {
				categoryID: channel.categoryID,
				id: channel.key,
				name: channel.name
			}
		});
	};

	handleCloseModal = () =>
		this.setState({ addModal: null, showDropdown: false });

	handleCreate = create => {
		const addModal = (
			<AddModal
				handleClose={this.handleCloseModal}
				create={create}
				options={
					create === "Channel"
						? this.objToArray(this.props.selectedServer.category)
						: null
				}
				onClick={
					create === "Channel" ? this.createChannel : this.createCategory
				}
			/>
		);
		this.setState({
			addModal: addModal
		});
	};

	handleInviteLink = () => console.log("getting invite link");

	handleLeaveServer = () => {
		const serverId = this.props.selectedServer.id;
		// removeing listner
		firebase
			.database()
			.ref("servers")
			.child(serverId)
			.off("value");
		// removing users from server
		this.removeFromFirebase(
			"servers/" + serverId + "/users/",
			this.props.uid,
			() => {
				// removing server from user joined server list
				this.removeFromFirebase(
					"users/" + this.props.uid + "/servers",
					serverId,
					() => {
						//changing selectedServer to null
						const selectedServerId = this.props.selectedServer.id;
						this.props.changeCurrentSelected({ server: null });
						this.props.removeServer(selectedServerId);
					}
				);
			}
		);
	};
	handleDeleteServer = () => {
		this.props.changeCurrentSelected({
			server: null
		});
		this.removeFromFirebase("servers", this.props.selectedServer.id);
		this.removeFromFirebase("messages", this.props.selectedServer.id);
	};

	removeFromFirebase = (ref, child, fn) => {
		firebase
			.database()
			.ref(ref)
			.child(child)
			.remove()
			.then(() => fn && fn())
			.catch(err => console.warn(err.message));
	};

	createInFirebase = (ref, child, obj, fn) => {
		firebase
			.database()
			.ref(ref)
			.child(child)
			.push(obj)
			.then(() => fn && fn())
			.catch(err => console.log(err.message));
	};

	createChannel = (name, option) => {
		this.createInFirebase(
			"servers/" + this.props.selectedServer.id, //ref
			"category/" + option + "/channels", //child
			{
				//push object
				name,
				messages: [],
				type: "text",
				categoryID: option
			},
			this.handleCloseModal //callback function
		);
	};

	createCategory = (name, type) => {
		this.createInFirebase(
			"servers/" + this.props.selectedServer.id, //ref
			"category/", //child
			{
				//push object
				name,
				channels: []
			},
			this.handleCloseModal //callback function
		);
	};
	dropdown = () => {
		const isAdmin = this.props.userRole.isAdmin;
		return (
			<div className="dropdown">
				<div className="item invite" onClick={this.handleInviteLink}>
					Invite
				</div>
				{isAdmin ? (
					<Fragment>
						<div className="item" onClick={() => this.handleCreate("Channel")}>
							create channel
						</div>
						<div className="item" onClick={() => this.handleCreate("Category")}>
							create category
						</div>
						<div className="item delete" onClick={this.handleDeleteServer}>
							delete server
						</div>
					</Fragment>
				) : (
					<div className="item leave" onClick={this.handleLeaveServer}>
						leave server
					</div>
				)}
			</div>
		);
	};

	handleHeaderClick = () =>
		this.setState(prev => ({ showDropdown: !prev.showDropdown }));

	render() {
		return (
			<div className="channels">
				<header onClick={this.handleHeaderClick}>
					{this.props.selectedServer.name} {/* header name */}
					<span className="arrow"></span> {/* arrow img */}
				</header>
				<div className="underline"></div>
				{this.state.showDropdown ? this.dropdown() : null}
				{this.displayChannels()}
				{this.state.addModal} {/* modal for creating channel or category */}
				<UserBar />
			</div>
		);
	}
}

export default Channels;
